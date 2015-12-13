package com.kk.muse.perftuning.home;

import java.net.URL;
import java.security.Principal;

import org.apache.catalina.loader.StandardClassLoader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(Principal principal) {
		ClassLoader cl = Thread.currentThread().getContextClassLoader();
		StandardClassLoader cl1 = (StandardClassLoader) cl.getParent();
		ClassLoader cl2 = cl.getSystemClassLoader();
		
		System.out.println("current classloader is : " + cl);
		System.out.println("parent classloader is : " + cl1);
		System.out.println("system classloader is : " + cl2);
		System.out.println("parent's parent classloader is : " + cl1.getParent());
		
		System.out.println("URLS for cl1 >>>>>>>>>>>>>>>>>>>>");
		URL[] cl1urls = cl1.getURLs();
		for(URL u : cl1urls)
			System.out.println(u);
		
		
		return principal != null ? "home/homeSignedIn" : "home/homeNotSignedIn";
	}
}
