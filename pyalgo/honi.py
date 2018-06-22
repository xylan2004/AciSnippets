import sys

pillars = [[], [], []]

def move(ss, ind):
    a = ss[ind % 3]
    b = ss[ind % 3 + 1]
    c = ss[ind % 3 + 2]

    if len(a) == 1:
        move_top(a, c)
    else:
        move(a[1:], b)
        c.append(a.pop())
        move(b, c)

    move(ss, ind + 1)
    
def move_u(ind):
    pillars 
