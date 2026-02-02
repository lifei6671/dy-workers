-- Migration number: 0001 	 2026-02-02T12:11:09.501Z
create table douyin_cover
(
    id          integer                  not null
        primary key autoincrement,
    video_id    varchar(255)  default '' not null
        unique,
    cover       varchar(255)  default '' not null,
    cover_image varchar(2000) default '' not null,
    expires     integer       default 0  not null,
    created     datetime                 not null,
    status      integer       default 0  not null
);

create table douyin_tag
(
    id       integer                 not null
        primary key autoincrement,
    tag_id   varchar(255) default '' not null,
    name     varchar(255) default '' not null,
    video_id varchar(255) default '' not null,
    created  datetime                not null,
    unique (tag_id, name, video_id)
);

create index douyin_tag_name
    on douyin_tag (name);

create index douyin_tag_tag_id
    on douyin_tag (tag_id);

create index douyin_tag_video_id
    on douyin_tag (video_id);

create table douyin_user
(
    id             integer                 not null
        primary key autoincrement,
    nickname       varchar(100) default '' not null,
    signature      varchar(255),
    avatar_larger  varchar(2000),
    avatar_cdn_url varchar(2000),
    hash_value     varchar(64),
    author_id      varchar(20)
        unique,
    created        datetime                not null
);

create index douyin_user_hash_value
    on douyin_user (hash_value);

create table douyin_video
(
    id                  integer                    not null
        primary key autoincrement,
    nickname            varchar(100)  default ''   not null,
    signature           varchar(255),
    avatar_larger       varchar(2000),
    author_id           varchar(20),
    author_short_id     varchar(10),
    video_raw_play_addr varchar(2000) default ''   not null,
    video_play_addr     varchar(2000) default ''   not null,
    video_id            varchar(255)  default ''   not null
        unique,
    video_cover         varchar(2000),
    video_local_addr    varchar(2000) default ''   not null,
    video_back_addr     varchar(2000),
    desc                varchar(1000),
    created             datetime                   not null,
    user_id             integer       default 0    not null,
    raw_link            varchar(255)  default '''' not null,
    video_local_cover   varchar(2000) default ''   not null,
    aweme_id            varchar(255)  default ''   not null
);

create index douyin_video_user_id
    on douyin_video (user_id);

create table users
(
    id        integer                                            not null
        primary key autoincrement,
    account   varchar(255)  default ''                           not null
        unique,
    password  varchar(2000),
    email     varchar(255)  default ''                           not null
        unique,
    avatar    varchar(1000) default '/static/avatar/default.jpg' not null,
    wechat_id varchar(200),
    status    integer       default 0                            not null,
    created   datetime                                           not null,
    updated   datetime                                           not null,
    baidu_id  integer
);

