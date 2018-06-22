import sys

def moveTower(h, f, t, w):
    if h >=1:
        moveTower(h-1, f, w, t)
        moveDisk(f,t)
        moveTower(h-1, w, t, f)

def moveDisk(f,t):
    print("moving disk from", f, "to", t)

moveTower(4, "A", "C", "B")
