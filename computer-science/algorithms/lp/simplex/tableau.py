import numpy as np
import math


class Simplex:
    '''
    Tableau is a matrix consisting of slack forms:
    1. Objective function z as first row
    2. Indices (not nonbasic variables) are placed in first index

    z = 3x1 + x2 + 2x3
    x4 = 30 - x1 - x2 - 3x3
    x5 = 24 - 2x1 - 2x2 - 5x3
    x6 = 36 - 4x1 - x2 - 2x3

    0   3   1   2
    30  -1  -1  -3
    24  -2  -2  -5
    36  -4  -1  -2

    N is set of indices of nonbasic variables
    B is set of indices of basic variables
    A is a matrix consisting of negatives of the coefficients
    b is set of integers for each constraint
    c is set of indices of the coefficients of the objective function
    '''
    def init_tableau(self, A, b, c):
        pass

    def get_pivot_index(tableau):
        # get index of entering variable
        # coeff must be positive in order to increase basic solution
        col = next(
            (idx for idx, x in np.ndenumerate(tableau[0, 1:]) if x > 0),
            None
        )

        if col is None:
            # all elements have negative coefficients
            return None

        constraints = []
        # find tightest constraint of entering variable
        # coefficient must be negative in order to increase basic solution
        # first element is integer i.e. not a non-basic variable
        for idx, eq in np.ndenumerate(tableau):
            if idx == 0:
                constraints.append(math.inf)
                continue
            coeff = eq[col] * -1
            constraints.append(math.inf if coeff < 0 else eq[0]/coeff)

        min_val = min(constraints)
        if min_val == math.inf:
            return "unbounded"
        row = constraints.index()
        return (row, col)

    def pivot(self, tableau, pivot_idx):
        pivot_tab = np.empty(list(tableau.shape))

        row, col = pivot_idx

        # rearrange and map pivot eq
        coeff = tableau[row, col] * -1
        coeff_divider = lambda x: x / coeff

        pivot_eq = tableau[row, :]
        leaving_var = -1 / coeff

        pivot_eq = coeff_divider(pivot_eq)
        pivot_eq[col] = leaving_var

        # update pivoted_tableau
        pivot_tab[row] = pivot_eq

        # substitute pivot eq to other rows
        for idx, eq in np.ndenumerate(tableau):
            if idx != row:
                coeff = eq[col]
                coeff_multiplier = lambda x: x * coeff
                temp = coeff_multiplier(pivot_eq)

                eq[col] = 0
                subst_arr = np.add(temp, eq)

                pivot_tab[idx] = subst_arr

        return pivot_tab

    def simplex(self,A,b,c):
        # (N,B,A,b,c,v)
        tableau = self.init_tableau(A,b,c)

        while True:
            pivot_idx = self.get_pivot_index(tableau)

            if pivot_idx is None:
                break

            tableau = self.pivot(tableau, pivot_idx)

        return tableau[0, 0]


        
            
            





