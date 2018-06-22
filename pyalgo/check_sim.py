import sys

args = sys.argv[1:]

def check_sim():
    all_chars = list('abcdefghijklmnopqrstuvwxyz')
    # or chr from 97 to 122

    c1 = list(args[0])
    c1r = [0] * 26
    c2 = list(args[1])
    c2r = [0] * 26

    print(c1)
    print(c2)

    for i in range(len(c1)):
        c1r[ord(c1[i]) - 97] = c1r[ord(c1[i]) - 97] + 1

    for i in range(len(c2)):
        c2r[ord(c2[i]) - 97] = c2r[ord(c2[i]) - 97] + 1 

    print(c1r)
    print(c2r)

    print(c1r ==  c2r)


check_sim()
