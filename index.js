const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

 const cookiesData = [
  { 
    name: 'tao_ga_RWHCWQ84Y0', 
    value: 'GS1.1.1706882898.2.1.1706882898.0.0.0',
    domain: '.colatv1.com',
    path: '/',

  },
  { 
    name: '_ga', 
    value: 'GA1.1.910312074.1706872085',
    domain: '.colatv1.com',
    path: '/',
  
  },
  { 
    name: 'userInfo', 
    value: '{"uid":250128,"userName":"cola1001","userImage":null,"userId":"cola1001","integralVal":88800,"userGender":null,"userGenderDesc":null,"createTime":"2024-01-20 21:12:27","regDayDesc":null,"userCity":null,"lastLoginTime":"2024-02-02 19:08:25","phone":"","countryPhone":null,"userLevel":1,"userGrowthValue":770,"appNumber":"00420038","imToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOiIwMDQyMDAzOCIsIlBsYXRmb3JtIjoiV2ViIiwiZXhwIjoxNzE0NjQ4MTA0LCJuYmYiOjE3MDY4NzE4MDQsImlhdCI6MTcwNjg3MjEwNH0.emGCBrN2G_c-IDDCz0DDG8Ih1_NGwuXQnJsZ9T3KVP8","nickName":"Vua ai cập","lang":null,"coupon":0,"attentionCount":0,"appUserType":1,"notVerifiedCountryPhone":84,"notVerifiedPhone":"432234234"}',
    domain: '.colatv1.com',
    path: '/pc',

  },
  { 
    name: 'lang', 
    value: 'vie',
    domain: '.colatv1.com',
    path: '/pc',
   
  },
];

  await page.context().addCookies(cookiesData);

  await page.goto('https://colatv1.com/pc/#/home');

  const cookies = await context.cookies();

  if (cookies.length > 0) {
    console.log('Cookies đã được lưu:', cookies);
  } else {
    console.log('Không có cookies nào được lưu.');
  }
  console.log('Trang web đã được truy cập thành công.');
  await page.waitForTimeout(5000);

  const chatMessages = ['Chào bạn!', 'Có ai ở đây không?', 'Xin chào!'];
  await page.goto('https://colatv1.com/pc/#/task?id=1');

  await page.waitForSelector('.basic-info', { state: 'visible' });
const basicInfo = await page.$eval('.basic-info', (infoElement) => {
  const nickname = infoElement.querySelector('.nickname-row .value').textContent.trim();
  const username = infoElement.querySelector('.username-row .value').textContent.trim();
  const phone = infoElement.querySelector('.phone-row .value').textContent.trim();

  return { nickname, username, phone };
});

console.log('Thông tin cơ bản:', basicInfo);

  
  const autoChat = async () => {
    for (const message of chatMessages) {
      await page.fill('textarea.textarea', message);
  
      // Chọn nút gửi và nhấn
      await page.click('div.send-btn');
      console.log(`Đã gửi: ${message}`);
  
      // Kiểm tra xem tin nhắn có được gửi thành công không
      const sentSuccessfully = await checkIfMessageSent(page);
  
      if (!sentSuccessfully) {
        console.error(`Lỗi: Tin nhắn "${message}" không được gửi.`);
        // Có thể thực hiện các hành động khác ở đây nếu cần
      }
  
      await page.waitForTimeout(60000);
    }
  };
  
  const checkIfMessageSent = async (page) => {
    // Sử dụng một selector hoặc điều kiện kiểm tra trạng thái sau khi gửi
    const successIndicatorSelector = 'SELECTOR_CUA_ELEMENT_XAC_NHAN';
    
    // Chờ đến khi element xuất hiện
    try {
      await page.waitForSelector(successIndicatorSelector, { state: 'visible' });
      return true; // Nếu element xuất hiện, tin nhắn được gửi thành công
    } catch (error) {
      return false; // Nếu không xuất hiện, tin nhắn không được gửi
    }
  };
  if (page.url().includes('btn.login-btn')) {
    console.error('Đăng nhập không thành công');
  } else {
    console.log('Đăng nhập thành công');
    await page.goto(`https://colatv1.com/pc/#/anchor/live?houseId=43612277`);
    console.log('Đến link ok');
    await autoChat();
    await browser.close();
  }

 
  

})();
