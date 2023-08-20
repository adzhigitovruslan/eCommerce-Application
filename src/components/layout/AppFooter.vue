<template>
  <footer>
    <div class="footer_payments">
      <img src="@/assets/images/paypal-logo.png" alt="PayPal" />
      <img src="@/assets/images/mastercard-logo.png" alt="MasterCard" />
      <img src="@/assets/images/mir-logo.png" alt="MIR" />
      <img src="@/assets/images/WebMoney_logo.png" alt="WebMoney" />
      <img src="@/assets/images/visa-logo.png" alt="Visa" />
      <img src="@/assets/images/paypal-logo.png" alt="PayPal" />
      <img src="@/assets/images/mastercard-logo.png" alt="MasterCard" />
    </div>
    <div class="footer-columns">
      <div class="footer_column">
        <h3>About Company</h3>
        <ul>
          <li>About Us</li>
          <li>Legal Information</li>
          <li>Careers</li>
        </ul>
      </div>

      <div class="footer_column">
        <h3>Terms of Service</h3>
        <ul>
          <li>Catalog</li>
          <li>Promotions</li>
          <li>Personal Account</li>
        </ul>
      </div>
      <div class="footer_column">
        <h3>Shop Info</h3>
        <ul>
          <li>New Products</li>
          <li>News</li>
          <li>Our Blog</li>
        </ul>
      </div>
      <div class="footer_column footer_column_image">
        <img src="@/assets/images/webmoney.png" alt="Verified WebMoney" />
        <div>Verified <br /><span>WebMoney</span></div>
      </div>
      <div class="footer_column footer_column_image">
        <img src="@/assets/images/SafeBrowsing_Icon.png" alt="Safe Browsing Google" />
        <div>Safe Browsing <br /><span>Google</span></div>
      </div>
    </div>
    <div class="footer_bottom">
      <p>
        All sold keys are purchased from official distributors and publishers, including 1C-SoftClub, Buka, New Disc,
        and Enaza.
      </p>
      <div class="footer_bottom_line">
        <div>Legal Information</div>
        <div>&copy; 2023 Playnchill. All Rights Reserved.</div>
        <div class="footer_bottom_icons">
        <font-awesome-icon :icon="['fab', 'vk']"  />
      <font-awesome-icon :icon="['fab', 'discord']" style="color: #77be1d" />
      <font-awesome-icon :icon="['fab', 'x-twitter']" />
      <font-awesome-icon :icon="['fab', 'instagram']"  /></div>
      </div>
      
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'AppFooter',
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';

.footer_payments {
  width: 80vw;
  margin: auto;

  img {
    height: 40px;
    margin-right: 38px;
    margin-top: 60px;
    margin-bottom: 60px;
  }
}

.footer-columns {
  width: 80vw;
  margin: auto;
  margin-bottom: 50px;
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  color: $white-color;
}

.footer_column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    font-family: $manrope-font-family;
    font-size: 22px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: $white-color;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: flex-start;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  img {
    width: 50px;
    margin-top: 10px;
  }

  li {
    margin-bottom: 5px;
  }

  div {
    font-family: $manrope-font-family;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  }

  span {
    font-family: $manrope-font-family;
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  }
}

.footer_column_image {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

@media (max-width: 768px) {
  .footer_payments,
  .footer-columns {
    width: 90vw; 
    margin: auto;
  }

  .footer_column {
    align-items: center;
    text-align: center;
    gap: 10px;

    h3 {
      font-size: 18px;
      margin-bottom: 5px;
      line-height: 24px;
    }

    ul {
      align-items: center;
      justify-content: center;
      gap: 15px;
    }

    img {
      width: 30px;
      height: auto;
    }

    div,
    span {
      font-size: 12px;
      line-height: 16px;
    }
  }

  .footer_column_image {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
}

.footer_bottom {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  color: rgba(99, 104, 109, 1);
  font-family: Inter;
font-size: 15px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
margin: auto;
margin-bottom: 200px;

  p {
    margin-bottom: 50px;
  }


  .footer_bottom_line {
    display: flex;
    width: 80vw;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: baseline;
    

    .footer_bottom_icons {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    font-size: 21px;
    color: rgba(255, 255, 255, 0.15);
  }
  }
}
</style>

