<template>
  <div class="column items-center">
    <div class="user-info column items-center q-mb-xl">
      <q-avatar size="100px" color="red" text-color="white">PZ</q-avatar>
      <h3 class="q-my-md">USERNAME</h3>
      <q-badge class="text-weight-bold " color="blue">
        #4D96F2
      </q-badge>
    </div>
    <div class="buttons-group q-mb-xl">
      <q-btn :color="friend.colorBtn" :icon="friend.iconBtn" :label="friend.textBtn" @click="toogleFriend"/>
      <q-btn :color="block.colorBtn" :icon="block.iconBtn" :label="block.textBtn" @click="toggleBlock"/>
    </div>
    <div class="text-meessage">
      <q-input outlined v-model="text"/>
      <q-btn color="primary" icon-right="fas fa-paper-plane" label="Send Message"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserProfileView',
    data() {
      return {
        friend: {
          colorBtn: 'primary',
          textBtn: "Add Friend",
          iconBtn: "fas fa-user-friends",
        },
        block: {
          colorBtn: 'primary',
          textBtn: "Block User",
          iconBtn: "fas fa-ban",
        }


      }
    },
    methods: {
      toogleFriend() {
        console.log('toggleFriend');
        this.friend.colorBtn === 'primary' ? this.friend.colorBtn = 'secondary' : this.friend.colorBtn = 'primary';
        this.friend.textBtn === 'Add Friend' ? this.friend.textBtn = 'Remove Friend' : this.friend.textBtn = 'Add Friend';
        this.friend.iconBtn === "fas fa-user-friends" ? this.friend.iconBtn = "fas fa-user-slash" : this.friend.iconBtn = "fas fa-user-friends";
      },
      toggleBlock() {
        console.log('toggleBlock');
        this.block.colorBtn === 'primary' ? this.block.colorBtn = 'secondary' : this.block.colorBtn = 'primary';
        this.block.textBtn === 'Block User' ? this.block.textBtn = 'Unblock User' : this.block.textBtn = 'Block User';
        this.block.iconBtn === "fas fa-ban" ? this.block.iconBtn = "fas fa-user" : this.block.iconBtn = "fas fa-ban";
      }
    },
  }
</script>

<style>
  h3 {
    font-size: 35px;
  }

  .q-badge {
    font-size: 24px;
    padding: 8px 12px;
  }

  .buttons-group, .text-meessage {
    align-self: flex-start;
  }

  .text-meessage {
    flex-direction: row;
    flex-wrap: nowrap;
    width: 75%;
  }
</style>
