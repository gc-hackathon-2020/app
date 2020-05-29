<template>
  <q-page padding>

    <div class="q-mb-lg text-center">
      <q-avatar
        v-bind:color="avatar.image ? 'white' : avatar.color"
        size="120px"
      >
        <img v-if="avatar.image" :src="avatar.image">
        <span v-if="!avatar.image">{{ avatar.initials }}</span>
      </q-avatar>
      <div class="q-mt-sm">
        User ID: <span class="text-weight-medium">{{ user.id }}</span>
      </div>
    </div>

    <q-toggle
      v-model="user.isTurnedOff"
      color="red"
      class="q-mb-md"
    >
      Do not disturb
    </q-toggle>

    <q-input outlined class="q-mb-md" v-model="user.nickname" label="Nickname">
      <template v-slot:prepend>
        <q-icon name="person"></q-icon>
      </template>
    </q-input>

    <q-input outlined class="q-mb-md" v-model="user.email" label="Email">
      <template v-slot:prepend>
        <q-icon name="email"></q-icon>
      </template>
    </q-input>

    <q-input outlined v-model="user.password" label="Password"  type="password">
      <template v-slot:prepend>
        <q-icon name="lock"></q-icon>
      </template>
    </q-input>

  </q-page>
</template>

<script>
export default {
  name: 'AccountSettings',
    data () {
        return {
            user: {
                nickname: "Troll",
                login: "troll",
                password: "123",
                email: "troll@goldencomm.com",
                id: "123",
                isTurnedOff: false
            },
            avatar: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKoRLYn5rzEM_7lsafW2w-2k88jKxDfz4ya6hthVqdUyOCOGyx&usqp=CAU",
                initials: "HD",
                color: "pink"
            }
        }
    }
}
</script>
