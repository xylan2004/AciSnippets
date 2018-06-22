import sys

changes = [25, 21, 10, 5, 1]
ex = 63
total = 0

def find_exchange(x):
    global total
    if (total + changes[x]) == ex:
        total = total + changes[x]
        print("add ", changes[x])
        print("total is ", total)
        return True
    elif (total + changes[x]) > ex:
        if x < len(changes) - 1:
            return find_exchange(x+1);
        else:
            return False

    total = total + changes[x]
    print("add ", changes[x])
    print("total is ", total)

    if find_exchange(x):
        return True

    return False

find_exchange(1)
