# -*- coding: utf-8 -*-
"""
Created on Mon Jan  4 17:18:58 2021

@author: vjspranav
"""

import tabula
#the pd is the standard shorthand for pandas
import pandas as pd

#declare the path of your file
file_path = "C:/Users/vjspranav/Downloads/Documents/CourseOfferings-S21-V3.pdf"
#Convert your file
df = tabula.read_pdf(file_path, multiple_tables=False, pages='all')
df = df[0]
df = df[df['CNO'].notna()]
df = df[df['CName'].notna()]
courses = {}
ha = {}
for i in df.index:
    courses[df['CNO'][i]] =  df['CName'][i]
    if 'H1' in courses[df['CNO'][i]]:
        ha[df['CNO'][i]]='h1'
    elif 'H2' in courses[df['CNO'][i]]:
        ha[df['CNO'][i]]='h2'
    else:
        ha[df['CNO'][i]]='common'

jsd = []
    
for key in courses.keys():
    str1='''
	        {
	                id: "%s",
	                name: "%s",
	                type: "%s",	               
        	        selected: false 
        	}''' % (key, courses[key], ha[key])
    jsd.append(str1)

with open('courses.json', 'w') as outfile:
	outfile.write('[')
	for ele in jsd[:-1]:
		outfile.write(ele+',')
	outfile.write(jsd[-1] +'\n]')
    