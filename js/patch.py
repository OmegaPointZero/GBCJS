f = open("fixed.txt", "r")
lines = f.readlines()

arr = []

for line in lines:
    leading_spaces = len(line) - len(line.lstrip())
    string = " "*leading_spaces
    l = line.split(' ')
    if l[-1] == "function(){\n":
        print "line:\n", l
        l.pop(-1)
        l.append("function(callback){\n")
        print l
    elif len(l)>1 and l[-2] == "function()":
        l.pop(-1)
        l.pop(-1)
        l.append("function(callback){\n")
    elif l[-1] == "},\n":
        l.pop(-1)
        string1 = string[0:-4] + "callback()\n"
        string2 = string + "},\n";
        l.append(string1)
        l.append(string2)
    v = " ".join(l)
#    print "v: ", v
    arr.append(v)
with open("fixed.txt", "w") as edited_file:
    edited_file.write("".join(arr))
