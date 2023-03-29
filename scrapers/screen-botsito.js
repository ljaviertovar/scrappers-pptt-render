const puppeteer = require("puppeteer")
require("dotenv").config()

const screenBotsito = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    headless: process.env.NODE_ENV === "production" ? true : false
  })
  try {
    const page = await browser.newPage()

    await page.goto('https://hiring.amazon.ca/app#/jobSearch')
    console.log("--WAITBTN--")

    await page.waitForSelector("#stencil-modal-body > div > div > div > div > div:nth-child(2) > button")
    const cookieBtn = await page.$("#stencil-modal-body > div > div > div > div > div:nth-child(2) > button")
    if (cookieBtn) {
      console.log("--BOTSITOBTN--")

      await cookieBtn.click()
    }

    console.log("--BOTSITO CLIC--")


    await new Promise(r => setTimeout(r, 1000))
    console.log("--BOTSITO ESPERO--")

    await page.screenshot({ path: 'jobs.jpg', fullPage: true })
    console.log("--BOTSITO SCREEN--")

    console.log("--BOTSITO FINISHED--")

    res.status(200).json({ "screenshot": "" })
  } catch (error) {
    console.error(e)
    res.status(500).json({ error })
  } finally {
    await browser.close()
  }
}

module.exports = { screenBotsito }