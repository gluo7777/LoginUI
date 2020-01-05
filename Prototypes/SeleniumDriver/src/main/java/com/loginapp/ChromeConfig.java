package com.loginapp;

import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

/**
 * ChromeConfig
 */
public class ChromeConfig implements DriverConfig{

    static{
        System.setProperty("webdriver.chrome.driver", "webdrivers/chromedriver.exe");
    }

    private WebDriver driver;

    public ChromeConfig(int waitSeconds){
        ChromeOptions options = new ChromeOptions();
        // https://peter.sh/experiments/chromium-command-line-switches/
        // chromedriver --help
        options.addArguments("--start-maximized");
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-infobars");
        options.addArguments("--disable-extensions");
        options.addArguments("--verbose");
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(waitSeconds, TimeUnit.SECONDS);
    }

    @Override
    public WebDriver getDriver() {
        return driver;
    }
    
}