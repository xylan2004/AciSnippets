import sys

def reverse(x):
    if len(x) > 1:
        y = reverse(x[1:])
        y.append(x[0])
        return y
    return x

str = sys.argv[1]

print(reverse(list(str)))
