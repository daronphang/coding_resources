import numpy as np
import math


class Simplex:
    '''
    N is set of indices of nonbasic variables 
    B is set of indices of basic variables
    A is a matrix consisting of negatives of the coefficients as they appear in slack form i.e. tableau
    b is set of integers for each constraint
    c is set of indices of the coefficients of the objective function
    '''
    def init_tableau(self, A, b, c):
        pass

    def get_pivot_index(tableau):
        # get index of entering variable
        col = next((idx for idx, x in np.ndenumerate(tableau[0, 1:]) if x > 0), None)

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
        
        row = constraints.index(min(constraints))
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
        tuple_tableau = self.init_tableau(A,b,c)

        while True:
            tableau = tuple_tableau[2]
            pivot_indexes = self.get_pivot_index(tableau)

            if pivot_indexes is None:
                break


        
            
            





