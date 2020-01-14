package org.login.app.config;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;

/**
 * Chrome
 */
public class Chrome implements DriverConfig {

    static{
        System.setProperty("webdriver.chrome.driver", "webdrivers/chromedriver.exe");
    }

    private WebDriver driver;

    public Chrome(){
        ChromeOptions options = new ChromeOptions();
        // https://peter.sh/experiments/chromium-command-line-switches/
        // chromedriver --help
        options.addArguments("--start-maximized");
        // options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        // options.addArguments("--no-sandbox");
        options.addArguments("--disable-infobars");
        options.addArguments("--disable-extensions");
        options.addArguments("--verbose");
        options.addArguments("--incognito");
        options.addArguments("--disable-default-apps");
        // options.addArguments("--disable-gpu-program-cache");
        options.addArguments("--disk-cache-size 0");
        driver = new ChromeDriver(options);
    }

    @Override
    public WebDriver getDriver() {
        return driver;
    }

}