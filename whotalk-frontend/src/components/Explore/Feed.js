import React, {Component} from 'react'
import Circle from './Circle';
import autobind from 'autobind-decorator';
import { UserInfo } from 'components/Common';
import Message from './Message';
import User from './User';

/* FeedTypes:
    - FOLLOW 
    - CHAT
*/

class Feed extends Component {

    mapToMessages = (messages) => {
        return messages.map(
            message => (
                <Message
                    username={message.username}
                    message={message.message}
                    anonymous={message.anonymous}
                    key={message._id}
                />
            )
        )
    }

    mapToUserInfos(followees) {
        return followees.map(
            (followee, i) => (
                <UserInfo 
                    username={followee.username} 
                    givenName={followee.givenName} 
                    familyName={followee.familyName}
                    following={(followee.following)
                            ? true
                            : false}
                    key={i}
                    disabled={followee.disabled}
                    onFollow={
                        () => { 
                            this.props.onFollow({
                                activityIndex: this.props.index,
                                userIndex: i,
                                username: followee.username
                            })
                        }
                    }
                    onUnfollow={
                        () => { 
                            this.props.onUnfollow({
                                activityIndex: this.props.index,
                                userIndex: i,
                                username: followee.username
                            })
                        }
                    }
                    hideButton={ followee.username === this.props.myUsername}
                />
            )
        )
    }

    renderFeed = () => {
        const { type, payload } = this.props;
        
        if(type === 'FOLLOW') {
            const length = payload.follow.followee.length;
            return (
                <div>
                    {/*<span className="user">{payload.follow.follower.username}</span> is following <span className="user">{payload.follow.followee.username}</span>
                    <UserInfo username={payload.follow.followee.username} givenName={payload.follow.followee.givenName} familyName={payload.follow.followee.familyName}/>*/}
                    <User username={payload.follow.follower.username}/> is following&nbsp;
                    {length === 1 ? <User username={payload.follow.followee[0].username}/> : <span><span className="number"> {length} </span>users</span>}
                    {this.mapToUserInfos(payload.follow.followee)}
                </div>
            )
        } else if (type === 'CHAT') {
            return (
                <div>
                    <User username={payload.chat.username} anonymous={payload.chat.anonymous}/> has talked to <User username={payload.chat.channel}/>
                    <div className="first-message"><span className="quote">“</span>{payload.chatData[0].message}<span className="quote">”</span></div>
                    <div className="message-container">
                        {this.mapToMessages(payload.chatData)}
                    </div>
                </div>
            )
        }
    }

    render () {
        const { renderFeed } = this;

        return (
            <div className="feed fadeIn7">
                <div className="feed-content">
                    <div className="head">
                        <Circle/>
                    </div>
                    <div className="body">
                        {renderFeed()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed