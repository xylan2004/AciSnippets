import sys

def fill_jugs(a, b):

    print("in jugs")

    if a == 2 or b == 2:
        print("a is ", a, " and b is ", b) 

    else:
        if a == 0:
            a = 4
        if b == 3:
            b = 0

        while a > 0 and  b < 3:
            a = a - 1
            b = b + 1

        fill_jugs(a, b)


fill_jugs(0, 0)
