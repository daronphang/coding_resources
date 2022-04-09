var solveSudoku = function(board) {
    // hashmap to store filled values of each subbox
    let hashmap = {
        '00': [],
        '03': [],
        '06': [],
        '30': [],
        '33': [],
        '36': [],
        '60': [],
        '63': [],
        '66': [],
    }
    
    // missing numbers dont have storage as splice operation is exp
    let missingNumbers = [];
    
    let row = 0;
    let col = 0;
    let i = 0;
    let j = 0;
    let k = 0;
    let count = 0;
    let temp = [];
    let tempRow = [];
    let tempCol = [];
    let getInitial = false;
    let reset = false;
    
    while (count > 0 || !getInitial) {
        
        missingNumbers = [];
        
        if (!getInitial) {
            temp = [];
            
            // get filled numbers for each subbox first
            for (i =row; i<row+3; i++) {
                for (j=col; j<col+3; j++) {
                    if (board[i][j] !== '.') temp.push(board[i][j]);
                    else {
                        // box is missing number
                        count++;

                        // convert '.' to array containing possible values
                        board[i][j] = [];
                    }
                }
            }
            
            temp.sort();
        } else {
            temp = hashmap[`${row}${col}`];
        }
        
        i = 1;
        
        // get missing numbers
        while (i <= 9) {
            if (temp[j] === `${i}`) j++;
            else missingNumbers.push(`${i}`)
            i++;
        }
        
        // for each missing number, scan row and col
        // update possible values in board[i][j]
        
        // scan row
        for (i=row; i<row+3; i++) {
            tempRow = [];
            for (j=col; j<col+3; j++) {
                if (typeof board[i][j] !== 'string') {
                    if (tempRow.length === 0) {
                        for (k=0; k<9; k++) {
                            temp = [];
                            if (k !== col && k !== col+1 && k !== col+2) temp.push(board[i][k]);
                        }
                        tempRow = missingNumbers.filter(num => !temp.includes(num));
                    }
                    board[i][j] = tempRow;
                }
            }
        }
        
        // scan col
        for (j=col; j<col+3; j++) {
            tempCol = [];
            for (i=row; i=row+3; i++) {
                if (typeof board[i][j] !== 'string') {
                    if (tempCol.length === 0) {
                        temp = getColumn(board,row,j,temp);
                        tempCol = missingNumbers.filter(num => !temp.includes(num));
                    }
                    board[i][j] = board[i][j].filter(num => tempCol.includes(num));
                }
            }
        }
        
        // for each missing value, check if one index (i,j) exists
        // if true, update board value
        for (k=0; k<missingNumbers.length; i++) {
            let indexes = [];
            reset = false;
            for (i=row; i<row+3; i++) {
                if (reset) break;
                
                for (j=col; j<col+3; j++) {
                    if (reset) break;
                    
                    if (board[i][j] !== 'string') {
                        temp = board[i][j];
                        if (temp.includes(missingNumbers[k])) {
                            if (indexes.length === 0) indexes.push(i,j);
                            else reset = true;
                        }
                    }
                }
            }
        }
        
        if (row === 6 && col === 6) {
        col = 0;
        row = 0;
        continue;
        }
    
        if (col === 6) {
            col = 0;
            row +=2;
        } else col+=2;    

    }
};

const getColumn = (board,row,col,temp) => {
    temp = [];
    for (let i=0; i<9; i++) {
        if (typeof board[i][col] === 'string') {
            if (i !== row && i !== row+1 && i !== row+2) temp.push(board[i][index]);
        }
    }
    temp.sort();
    return temp;
}
