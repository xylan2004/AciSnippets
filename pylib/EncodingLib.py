# coding=utf-8

import sys

# sys.stdout = codecs.lookup('iso8859-1')[-1](sys.stdout)

print 'System Encoding is', sys.getdefaultencoding()

# python中的str对象其实就是"8-bit string" ，字节字符串，本质上类似java中的byte[]。
s_chinese = '中文'
# 而python中的unicode对象应该才是等同于java中的String对象，或本质上是java的char[]。
s_unicode_chinese = u'中文'

print 's_chinese is str', isinstance(s_chinese, str)
print 's_unicode_chinese is basestring', isinstance(s_unicode_chinese, basestring)

# encoding list: https://docs.python.org/2.4/lib/standard-encodings.html
print u'"中文"的unicode-escape原生字符串', repr(s_chinese.decode('unicode-escape'))
print u'"中文"的gb18030原生字符串', repr(s_chinese.decode('gb18030'))
print u'"中文"的utf-8原生字符串', repr(s_chinese.decode('utf-8'))
print u'"中文"的utf-8原生字符串', repr(s_unicode_chinese)  #

print s_unicode_chinese.encode('utf-8')
print s_chinese == s_unicode_chinese
# print u'A good idea\u00AE'.encode('latin-1')
# print s.encode('ascii', 'xmlcharrefreplace')

# accept input and parse to int
# input = int(raw_input('come>'))
# print input + 2
