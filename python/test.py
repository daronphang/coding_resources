raw_items = [
    {'ticker': 'TEST2', 'order_id': 1},
    {'ticker': 'TEST3', 'order_id': 3},
    {'ticker': 'TEST4', 'order_id': 4},
    {'ticker': 'TEST6', 'order_id': 6},
    {'ticker': 'TEST7', 'order_id': 7},
    {'ticker': 'TEST9', 'order_id': 9},
    {'ticker': 'TEST10', 'order_id': 10}
]
delete_order_ids = [2, 5, 8]

# filter items that do not need to update order_ids
update_items = [item for item in raw_items if item['order_id'] > delete_order_ids[0]]

for item in update_items:
    deduct_number = 0
    for id in delete_order_ids:    
        if item['order_id'] < id:
            break
        deduct_number += 1
    item['order_id'] -= deduct_number
print(update_items)
