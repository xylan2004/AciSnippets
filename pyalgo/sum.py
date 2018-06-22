import sys

def sum(x):
    if x > 1:
        return x + sum(x-1)

    return 1

n = int(sys.argv[1])
print('input is %d' % n)
print('result is %d' % sum(n))
