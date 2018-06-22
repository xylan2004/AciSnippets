import sys

lx = 3
ly = 3
rx = 0
rx = 0 

def wade(x, y, d):
    global lx
    global ly
    global rx
    global ry
    if (lx - (-1) ** d * x) >=0 and 
    
    lx = lx - (-1) ** d * x
    ly = ly - (-1) ** d * y
    rx = rx + (-1) ** d * x
    ry = ry + (-1) ** d * y

    if ly > lx or ry > rx:
        return False
    else
        for l
