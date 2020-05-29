<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
      <q-toolbar class="flex justify-between">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-btn
          flat
          to="/"
        >
            <img alt="App logo"
                 width="64"
                 height="64"
                 class="q-ml-auto q-mr-auto"
                 src="~assets/icon.png">
        </q-btn>

        <q-btn
          round
          flat
          to="/settings"
        >
          <q-avatar
            v-bind:color="avatar.image ? 'white' : avatar.color"
            to="/settings"
          >
            <img v-if="avatar.image" :src="avatar.image">
            <span v-if="!avatar.image">{{ avatar.initials }}</span>
          </q-avatar>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="body--light flex column"
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

      </q-list>

      <div @click="$q.dark.toggle()" class="q-mt-auto q-mb-xl flex justify-center">
        <div class="q-mr-sm">Theme color switch</div>
        <i class="fas fa-sun icon-sun" v-if="$q.dark.isActive"></i>
        <i class="fas fa-moon icon-moon" v-else @click="$q.dark.toggle()"></i>
      </div>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import EssentialLink from 'components/EssentialLink'

  export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  data () {
    return {
      avatar: {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKoRLYn5rzEM_7lsafW2w-2k88jKxDfz4ya6hthVqdUyOCOGyx&usqp=CAU",
          initials: "HD",
          color: "pink"
      },
      leftDrawerOpen: false,
      themeColor: 'Dark',
      essentialLinks: [
        {
          title: "Friends List",
          caption: 'View your list of friends',
          icon: 'group',
          link: '/friends'
        },
        {
          title: 'My Account',
          caption: 'Adjust your account settings',
          icon: 'settings',
          link: '/settings'
        },
        {
          title: 'Docs',
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev'
        },
        {
          title: 'Github',
          caption: 'github.com/quasarframework',
          icon: 'code',
          link: 'https://github.com/quasarframework'
        },
        {
          title: 'Discord Chat Channel',
          caption: 'chat.quasar.dev',
          icon: 'chat',
          link: 'https://chat.quasar.dev'
        },
        {
          title: 'Forum',
          caption: 'forum.quasar.dev',
          icon: 'record_voice_over',
          link: 'https://forum.quasar.dev'
        },
        {
          title: 'Twitter',
          caption: '@quasarframework',
          icon: 'rss_feed',
          link: 'https://twitter.quasar.dev'
        },
        {
          title: 'Facebook',
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://facebook.quasar.dev'
        },
        {
          title: 'Quasar Awesome',
          caption: 'Community Quasar projects',
          icon: 'favorite',
          link: 'https://awesome.quasar.dev'
        }
      ]
    }
  }
}
</script>
