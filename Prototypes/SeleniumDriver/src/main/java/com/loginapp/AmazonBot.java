package com.loginapp;

import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * AmazonBot
 */
public class AmazonBot {

    private DriverConfig config;
    public static final String MAIN = "http://www.amazon.com";

    public AmazonBot() {
        this.config = new ChromeConfig(20);
    }
    

    private WebDriver driver() {
        return this.config.getDriver();
    }

    public void get(String url){
        driver().get(url);
    }

    public void goToShopHeader(String heading) {
        driver().findElement(By.id("nav-xshop")).findElements(By.className("nav-a")).stream()
                .filter(nav -> nav.getText().equalsIgnoreCase(heading)).findFirst().orElseThrow().click();
    }

    public void filterDealsOnDepartments(String... departments) {
        // Checkbox -> new page
        // Fresh search for each element
        for (String department : departments) {
            driver().findElements(By.cssSelector("div.a-checkbox.checkbox")).stream().filter(e -> {
                String category = e.findElement(By.cssSelector("label span")).getText();
                return department.equalsIgnoreCase(category);
            }).findFirst()
            .map(checkBox -> checkBox.findElement(By.cssSelector("label input")))
            .ifPresent(WebElement::click);
        }
    }

    public List<String> getDealTitlesOnPage() {
        List<String> deals = new LinkedList<>();
        List<WebElement> links = driver().findElements(By.id("dealTitle"));
        System.out.printf("Found %d deal titles.", links.size());
        for (WebElement link : links) {
            WebElement span = link.findElement(By.tagName("span"));
            System.out.println("Deal Title Span Found: " + span.isDisplayed());
            System.out.println("Sale: " + span.getText());
            deals.add(span.getText());
        }
        return deals;
    }

    public boolean nextPage(){
        try{
            WebElement nextLink = driver().findElement(By.partialLinkText("Next"));
            nextLink.click();
            return true;
        }catch(NoSuchElementException e){
            return false;
        }
    }

    public String getTitle() {
        return this.config.getDriver().getTitle();
    }

    public void closeWindow() {
        this.config.getDriver().close();
    }

    // testing
    public static void main(String[] args) {
        AmazonBot bot = new AmazonBot();
        try{
            bot.get(AmazonBot.MAIN);
            bot.goToShopHeader("Today's Deals");
            bot.filterDealsOnDepartments("Amazon Devices", "Baby Clothing & Accessories");
            boolean hasNextPage = true;
            while(hasNextPage){
                bot.getDealTitlesOnPage().stream().forEach(System.out::println);
                hasNextPage = bot.nextPage();
            }
        }finally{
            bot.closeWindow();
        }
    }
}