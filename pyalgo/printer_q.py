import sys
import datetime
import random
from queue import Queue

def find_pattern():
    q = [] # runing queue, ele is K:V, k is task no, V is start time
    p = [] # finished queue, ele is K:V, k is task no, V is used time
    m = 20 # 1~20 page
    se = 6 # 6s for 1 page

    for i in range(3600):
        t = random.randint(1,180)
        if t == 180:
            tn = random.randint(1,m)
            q.append({'t':tn, 'l':len(q), 'i':i, 's':i, 'e': 0})
        if len(q) == 0:
            continue

        q[0]['e'] = q[0]['e'] + 1

        if q[0]['e'] >= (q[0]['t'] * se):
            print('%d > %d' % (q[0]['e'], q[0]['t']*se))
            ele = q.pop(0)
            ele['s'] = i - ele['s']
            p.append(ele)

    total = 0
    total_w = 0
    for i in range(len(p)):
        total = total + p[i]['s']
        total_w = total_w + p[i]['s'] - p[i]['t'] * se

    print('left : %d, finish : %d' % (len(q), len(p)))
    for i in range(len(p)):
        print(p[i])
    print(total / len(p))
    print(total_w / len(p))

find_pattern()
