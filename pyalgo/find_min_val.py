import sys

args = sys.argv

def find_min_val():
	strs = args[1:]
	ints = []
	for i in range(len(strs)):
		ints.append(int(strs[i]))

	min_v = ints[0]
	for i in range(1, len(ints)):
		if min_v > ints[i]:
			min_v = ints[i]

	print(ints)
	print("min value is %d" % min_v)


find_min_val()
