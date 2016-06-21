/**
 * Created by heke on 2016/6/21.
 */
import request from './request';

export function getUserName(userID) {
    return request('/users/' + userID)
        .then(user=>user.name);
}
