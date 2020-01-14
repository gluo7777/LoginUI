package org.login.app;

import org.login.app.config.Chrome;
import org.login.app.config.DriverConfig;

import org.junit.AfterClass;
import org.junit.Before;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.After;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
    
/**
 * LoginAppStory
 */
public class LoginAppIntegrationTest {
    private static DriverConfig driverConfig;
    private static final Logger LOG = LoggerFactory.getLogger(LoginAppIntegrationTest.class);

    @BeforeClass
    public static void setUp(){
        if(System.getProperty("browser", "chrome").equalsIgnoreCase("chrome")){
            driverConfig = new Chrome();
        }
        driverConfig.setTimeOut(5);
    }

    @AfterClass
    public static void tearDown(){
        if(driverConfig != null)
            driverConfig.getDriver().close();
    }

    private WebDriver driver;

    @Before
    public void loadPage(){
        this.driver = driverConfig.getDriver();
        driver.get("http://www.loginapp.com");
        LOG.info("Initial Page: {}", driver.getCurrentUrl());
    }
    
    @Test
    public void onLoginPage() throws InterruptedException {
        // Given I'm on login page
        // I expect url to be 
        WebDriverWait wait = new WebDriverWait(driver, 5);
        wait.until(ExpectedConditions.urlToBe("http://www.loginapp.com/"));
        // and I expect to see Please sign in text
        String signInText = driver.findElement(By.xpath("//h1[contains(text(),'Please sign in')]")).getText();
        assertThat(signInText).isEqualTo("Please sign in");
        // and I expect to see sign in button
        WebElement submit = driver.findElement(By.xpath("//button[contains(text(),'Sign in')]"));
        assertThat(submit.isEnabled()).isTrue();
    }

    @After
    public void resetBrowser(){
        driver.manage().deleteAllCookies();
        assertThat(driver.manage().getCookies()).isEmpty();
    }

}