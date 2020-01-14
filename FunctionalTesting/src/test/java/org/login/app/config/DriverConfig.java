package org.login.app.config;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;

/**
 * DriverConfig
 */
public interface DriverConfig {
    WebDriver getDriver();
    default public void setTimeOut(int seconds){
        this.getDriver().manage().timeouts().implicitlyWait(seconds, TimeUnit.SECONDS);
    }

    default public void clearBrowserHistory(){
        throw new UnsupportedOperationException("Not Implemented");
    }
}