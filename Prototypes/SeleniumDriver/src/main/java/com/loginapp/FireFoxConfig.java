package com.loginapp;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

/**
 * Inititialize Webdriver
 * - Loads page
 */
public class FireFoxConfig implements DriverConfig{

    static{
        System.setProperty("webdriver.gecko.driver", "webdrivers/geckodriver.exe");
    }

    private WebDriver driver;

    public FireFoxConfig(){
        Capabilities capabilities = DesiredCapabilities.firefox();
        driver = new FirefoxDriver(capabilities);
        driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
    }

    @Override
    public WebDriver getDriver() {
        return driver;
    }
}