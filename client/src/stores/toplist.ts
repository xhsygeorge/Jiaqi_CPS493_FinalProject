import { reactive, watch } from "vue";
import type { Friend } from "./friends";
import session, { api } from "./session";

const PATCH = 'PATCH';

export interface TopListFriend {
    quantity: number;
    friend: Friend;
}

const toplist = reactive([] as TopListFriend[]);

export function load() {
    api(`cart/${session.user?.name}`).then((data) => {
        toplist.splice(0, toplist.length, ...data as TopListFriend[]);
    });
}
watch(()=> session.user, load);

export function addFriendToToplist(friend: Friend, quantity: number = 1) {
    api(`cart/${session.user?.name}`, { productId: friend._id, quantity }).then((data) => {
        const i = toplist.findIndex((x) => x.friend._id === friend._id);
        if (i != -1) {
            toplist[i] = data as TopListFriend;
            session.messages.push({ type: 'success', text: `Updated ${friend.name} in cart to ${toplist[i].quantity}`});
        } else {
            toplist.unshift(data as TopListFriend);
            session.messages.push({ type: 'success', text: `Added ${friend.name} to top list`});
        }
    });
}

export default toplist;