/* eslint-disable */

module.exports = {
    USER: {
        LOGIN: {
            SUCCESS: {
                T1: {
                    email: 'user04@email.com',
                    password: '123456',
                }
            },
            FAILURE: {
                T1: {
                    email: 'user04@email.com',
                    password: '1234567',
                }
            }
        },
    },
    PROJECT: {
        REGISTER: {
            SUCCESS: {
                T1: {
                    name: 'In eget dolor cursus nisi rutrum tempus a sit amet orci',
                    status: 'SB',
                    createdat: '2022-05-06T15:24:39.546',
                    problem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at justo porta dui tincidunt viverra id vitae lorem. Fusce elit eros, bibendum id sem sit amet, elementum iaculis turpis. Donec molestie urna id hendrerit porttitor. Donec dui purus, efficitur et nunc eu, maximus elementum lacus. Nullam pellentesque gravida dolor non sagittis. Suspendisse molestie nulla nec augue eleifend dignissim. Sed volutpat mauris sapien, at luctus arcu euismod non. ',
                    expectedresult: 'Duis feugiat nunc sed nunc aliquam congue. Morbi scelerisque ultricies justo vitae molestie. Donec auctor laoreet pretium.',
                    userid: 1,
                    keywords: [{ keywordid: 1, main: true }, { keywordid: 2, main: false }],
                },
            },
            FAILURE: {
                T1: {
                    name: null,
                    status: 'SB',
                    createdat: '2022-05-06T15:24:39.546',
                    problem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at justo porta dui tincidunt viverra id vitae lorem. Fusce elit eros, bibendum id sem sit amet, elementum iaculis turpis. Donec molestie urna id hendrerit porttitor. Donec dui purus, efficitur et nunc eu, maximus elementum lacus. Nullam pellentesque gravida dolor non sagittis. Suspendisse molestie nulla nec augue eleifend dignissim. Sed volutpat mauris sapien, at luctus arcu euismod non. ',
                    expectedresult: 'Duis feugiat nunc sed nunc aliquam congue. Morbi scelerisque ultricies justo vitae molestie. Donec auctor laoreet pretium.',
                    userid: 1,
                    keywords: [{ keywordid: 1, main: true }, { keywordid: 2, main: false }],
                },
            },
        },
        UPDATE: {
            SUCCESS: {
                T1: {
                    projectid: 1,
                    name: 'In eget dolor cursus nisi rutrum tempus a sit amet orci',
                    problem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at justo porta dui tincidunt viverra id vitae lorem. Fusce elit eros, bibendum id sem sit amet, elementum iaculis turpis. Donec molestie urna id hendrerit porttitor. Donec dui purus, efficitur et nunc eu, maximus elementum lacus. Nullam pellentesque gravida dolor non sagittis. Suspendisse molestie nulla nec augue eleifend dignissim. Sed volutpat mauris sapien, at luctus arcu euismod non. ',
                    expectedresult: 'Duis feugiat nunc sed nunc aliquam congue. Morbi scelerisque ultricies justo vitae molestie. Donec auctor laoreet pretium.',
                    keywords: [{ keywordid: 1, main: true }, { keywordid: 2, main: false }],
                },
            },
            FAILURE: {
                T1: {
                    projectid: null,
                    name: null,
                    problem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at justo porta dui tincidunt viverra id vitae lorem. Fusce elit eros, bibendum id sem sit amet, elementum iaculis turpis. Donec molestie urna id hendrerit porttitor. Donec dui purus, efficitur et nunc eu, maximus elementum lacus. Nullam pellentesque gravida dolor non sagittis. Suspendisse molestie nulla nec augue eleifend dignissim. Sed volutpat mauris sapien, at luctus arcu euismod non. ',
                    expectedresult: 'Duis feugiat nunc sed nunc aliquam congue. Morbi scelerisque ultricies justo vitae molestie. Donec auctor laoreet pretium.',
                    keywords: [{ keywordid: 1, main: true }, { keywordid: 2, main: false }],
                },
            },
        },
        EVALUATE: {
            SUCCESS: {},
            FAILURE: {},
        },
    },
};