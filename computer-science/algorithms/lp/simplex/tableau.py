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

    0    0   3   1   2  0   0   0
    4   30  -1  -1  -3  0   0   0
    5   24  -2  -2  -5  0   0   0
    6   36  -4  -1  -2  0   0   0

    N is set of indices of nonbasic variables
    B is set of indices of basic variables
    A is a matrix consisting of negatives of the coefficients
    b is set of integers for each constraint
    c is set of indices of the coefficients of the objective function
    '''
    def init_tableau(self, A, b, c):
        tableau = np.zeros(shape=(len(A) + 1, len(A[0] + 2)))

        for idx, x in np.ndenumerate(tableau):
            if idx == 0:
                # initialize objective function
                tableau[idx] = np.array([0, 0] + c)
            else:
                basic = len(A[0]) + idx
                nonbasic = np.array(A[idx - 1])
                multiplier = lambda x: x * -1
                nonbasic = multiplier(nonbasic)
                tableau[idx] = np.add(np.array([basic, b[idx - 1]]), nonbasic)

        if min(b) >= 0:
            # initial basic solution is feasible
            return tableau

        # form auxiliary program
        for idx, x in np.ndenumerate(tableau):
            if idx == 0:
                newArr = np.zeros(shape=(1, len(x) + 1))
                newArr[np.shape(newArr)[1]] = -1
                tableau[idx] = newArr
            else:
                tableau[idx] = np.append(x, [-1])
            
        # make one call to pivot with x0 as entering var
        pivot_idx = self.get_pivot_index(tableau)
        updt_tableau = self.pivot(tableau, pivot_idx)

        # obtain an optimal solution to auxiliary
        while True:
            pivot_idx = self.get_pivot_index(updt_tableau)

            if pivot_idx is None:
                break

            updt_tableau = self.pivot(updt_tableau, pivot_idx)
        
        # check if x0 is set to 0
        for row in updt_tableau:
            if row[0] == np.shape(row)[1] - 1:
                return "infeasible"
        
        # restore original objective func with modifications

    def get_pivot_index(tableau):
        # get index of entering variable
        # coeff must be positive in order to increase basic solution
        col = next(
            (idx for idx, x in np.ndenumerate(tableau[0, 2:]) if x > 0),
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
        # swap entering and leaving variable's coefficients
        pivot_eq[col] = leaving_var
        # update basic variable
        pivot_eq[0] = col - 1

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

    def simplex(self, A, b, c):
        # (N,B,A,b,c,v)
        tableau = self.init_tableau(A, b, c)

        while True:
            pivot_idx = self.get_pivot_index(tableau)

            if pivot_idx is None:
                break

            tableau = self.pivot(tableau, pivot_idx)

        colLen = np.shape(tableau)[1] - 1
        optimized_constraints = [0] * colLen

        # update basic solution
        optimized_constraints[0] = tableau[0, 1]
        # update initial nonbasic variables i.e. objective function variables
        for row in tableau:
            if row[0] <= colLen:
                optimized_constraints[row[0]] = row[1]
        return optimized_constraints
