<template>
  <div class="q-pa-md flex column" style="max-width: 100%">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Friends List</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item-label header>Online</q-item-label>
      <q-item v-for="friend in online" :key="friend.id" class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ friend.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ friend.name }}</q-item-label>
          <q-item-label caption lines="1">{{ friend.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" color="green"></q-icon>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green"></q-icon>
        </q-item-section>

      </q-item>

      <q-separator ></q-separator>
      <q-item-label header>Offline</q-item-label>

      <q-item v-for="friend in offline" :key="friend.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${friend.avatar}`">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ friend.name }}</q-item-label>
          <q-item-label caption lines="1">{{ friend.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" color="green"></q-icon>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey"></q-icon>
        </q-item-section>

      </q-item>
    </q-list>

    <q-btn round color="primary" icon="add" class="q-ml-auto q-mt-xs"/>

  </div>
</template>

<script>
  export default {
    name: 'FriendsList',
    data () {
      return {
        online: [
          {
            id: 1,
            name: 'Ruddy Jedrzej',
            email: 'rjedrzej0@discuz.net',
            letter: 'R'
          }, {
            id: 2,
            name: 'Mallorie Alessandrini',
            email: 'malessandrini1@marketwatch.com',
            letter: 'M'
          }, {
            id: 3,
            name: 'Elisabetta Wicklen',
            email: 'ewicklen2@microsoft.com',
            letter: 'E'
          }, {
            id: 4,
            name: 'Seka Fawdrey',
            email: 'sfawdrey3@wired.com',
            letter: 'S'
          }
        ],
        offline: [
          {
            id: 5,
            name: 'Brunhilde Panswick',
            email: 'bpanswick4@csmonitor.com',
            avatar: 'avatar2.jpg'
          }, {
            id: 6,
            name: 'Winfield Stapforth',
            email: 'wstapforth5@pcworld.com',
            avatar: 'avatar6.jpg'
          }
        ]
      }
    }
  }
</script>
