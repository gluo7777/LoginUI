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
        options.setBinary(Paths.get("webdrivers", "chromedriver.exe").toFile());
        // https://peter.sh/experiments/chromium-command-line-switches/
        // chromedriver --help
        options.addArguments("start-maximized");
        options.addArguments("allow-insecure-localhost");
        options.addArguments("headless");
        options.addArguments("verbose");
        options.addArguments("readable-timestamp");
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(waitSeconds, TimeUnit.SECONDS);
    }

    @Override
    public WebDriver getDriver() {
        return driver;
    }
    
}