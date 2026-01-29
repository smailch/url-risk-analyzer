import httpx
import asyncio

async def test_urlhaus(url):
    api_url = "https://urlhaus-api.abuse.ch/v1/url/"
    async with httpx.AsyncClient() as client:
        resp = await client.post(api_url, data={"url": url})
        print("Status:", resp.status_code)
        print("Body:", resp.text)

# Remplace par l'URL à tester :
url = "http://175.168.203.241:40796/i"
asyncio.run(test_urlhaus(url))