<template>
  <div class="container-about">
    <header class="about__header">
      <div>
        <h1>Development Team of <br />Online Store</h1>
        <div class="about__store_logo">
          <br /><img src="/icon_logo2.png" alt="logo" class="about__logo" />
          <span>Playnchill</span>
        </div>
      </div>

      <img src="@/assets/images/Illustration.svg" alt="Illustration" class="header__img" />
    </header>

    <section class="about__team">
      <div v-for="member in teamMembers" :key="member.name" class="container__team__member">
        <div class="team-member-card">
          <img :src="getImagePath(member.photo)" alt="Team Member Photo" class="member__photo" />
          <div>
            <h2>{{ member.role }}</h2>
            <h3>{{ member.name }}</h3>
          </div>
        </div>

        <p>{{ member.bio }}</p>
        <p>{{ member.contribution }}</p>
        <a :href="member.githubProfile">{{ member.name }}' s GitHub Profile</a>
      </div>
    </section>

    <section class="about__collaboration">
      <h2>Our Team Collaboration Methods</h2>
      <p>
        The team follows the Scrum methodology and has completed 4 sprints, effectively dividing tasks and working on a
        Trello board. They have harnessed the power of Vue, Typescript, and SCSS to create an exceptional user
        experience. Leveraging commercetools, they ensure seamless integration of online games and merchandise into
        their store.
      </p>
      <p>
        The team holds daily meetings to discuss current progress and identify any challenges. They actively use a task
        management system to organize and track their work. Communication between developers takes place through regular
        meetings and feedback sessions.
      </p>
      <p>
        The team combines their skills and passion for gaming to create a unique and engaging experience for their
        users. On the path to building the Online Video Game and Merchandise Store Playnchill, they strive for high
        quality and innovative solutions.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import teamMembersData from '@/teamMembers.json';
import { defineComponent } from 'vue';

console.log(teamMembersData);

export default defineComponent({
  data() {
    return {
      teamMembers: teamMembersData,
    };
  },
  methods: {
    getImagePath(photo: string): string {
      console.log(photo, `@/assets/images/${photo}`);

      return require(`@/assets/images/${photo}`);
    },
  },
});
</script>

<style scoped lang="scss">
.container-about {
  width: 80vw;
  margin: auto;
  font-size: 44px;
  font-weight: 800;
  line-height: 83px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  font-family: 'Manrope', sans-serif;

  .about__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-top: 100px;

    h1 {
      font-size: 42px;
      font-weight: 800;
      line-height: 83px;
      letter-spacing: 0em;
      text-align: center;
    }

    .about__store_logo {
      display: flex;
      align-items: center;
      justify-content: center;
      .about__logo {
        margin-right: 30px;
        height: 59px;
      }
    }

    .header__img {
      max-width: 600px;
      height: auto;
    }
  }

  .about__team {
    position: relative;
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &::before {
      content: '';
      position: absolute;
      top: -100px;
      left: 0;
      right: 0;
      height: 90px;
      background: linear-gradient(180deg, rgba(6, 3, 15, 0) 0%, #06030f 62.38%);
    }

    .container__team__member {
      background-color: transparent;
      padding-top: 50px;
      margin: 10px;
      border-radius: 5px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;

      .team-member-card {
        display: flex;
        justify-content: space-around;
        .member__photo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }

        h2 {
          font-size: 32px;
          font-weight: 600;
          line-height: 49px;
          letter-spacing: 0em;
          text-align: center;
        }

        h3 {
          font-size: 22px;
          font-weight: 800;
          line-height: 36px;
          letter-spacing: 0em;
          text-align: center;
        }
      }

      p {
        margin-top: 10px;
        font-size: 22px;
        font-weight: 500;
        line-height: 34px;
        letter-spacing: 0em;
        text-align: justify;
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
      }

      a {
        text-decoration: none;
        color: #77be1d;
        display: block;
        margin-top: 10px;
        font-size: 22px;
      }
    }
  }

  .about__collaboration {
    margin-top: 100px;
    margin-bottom: 100px;

    h2 {
      font-size: 32px;
      font-weight: 800;
      line-height: 36px;
      letter-spacing: 0em;
      text-align: left;
      margin: 35px;
    }

    p {
      font-size: 22px;
      font-weight: 500;
      line-height: 36px;
      letter-spacing: 0em;
      text-align: justify;
      margin-top: 50px;
      color: rgba(255, 255, 255, 0.7);
      text-indent: 35px;
    }
  }
}
</style>
