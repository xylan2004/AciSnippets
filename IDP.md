IDP
========
# Reading Books #
1. 面向模式的软件体系架构 1 ~ 5
2. 代码大全2
3. 系统架构师教程
4. 系统分析师教程

# Docker #
Need check [DockerOne](http://dockone.io/topic/Docker) for more information.

# OPS #
## Design ##
1. Tools

## Web Technics to Use ##
1. AngularJs or React.js
2. NodeJs
3. Django

## Mobile Technics to Use ##
1. Android Native
2. iOS Native

## Service ##
1. Micro Service


# Learn Git #
## Git Concept ##
1. Git Lifecycle

	<img src="http://www.yiibai.com/uploads/allimg/131014/2029501R4-0.png" width="500"" heigh="400" title="Git Lifecycle"/>
	
2. Git Status & Git Log  

	<img src="https://www.atlassian.com/git/images/tutorials/getting-started/inspecting-a-repository/01.svg" />

3. 

## Git Usage ##
1. Get error "The following untracked working tree files would be overwritten by merge" when "git pull"
   
	**Error:**
   
	`Updating 7c9e086..936acac
	error: The following untracked working tree files would be overwritten by merge:
	Common/HFHttpRequest/HFHttpRequestParameters.h
	Common/HFHttpRequest/HFHttpRequestParameters.m
	Please move or remove them before you can merge.
	Aborting`
	
	**Solution**
	
	`git clean  -d  -fx ""`  
	`其中:`  
	`x  -----删除忽略文件已经对git来说不识别的文件`  
	`d  -----删除未被添加到git的路径中的文件`  
	`f  -----强制运行`
	
2. Check "git add" and Revert "git add"

	**Check Contents in Git Add**  
	`git add -i`  
	`可通过git add -i [<path>]命令查看<path>中被所有修改过或已删除文件但没有提交的文件`  


3. git reset --hard HEAD^

4. git log  
	`git log --graph --decorate --oneline`










*end*