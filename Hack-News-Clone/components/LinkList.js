import React from 'react';
import Link from './Link';
import {gql, useQuery} from '@apollo/client';
import {LINKS_PER_PAGE} from '../constants';
import { useHistory } from 'react-router';

export const FEED_QUERY = gql`
    query FeedQuery(
        $skip: Int 
        $take: Int
        $orderBy: LinkOrderByInput
    ) {
        feed(skip: $skip, take: $take, orderBy: $orderBy) {
            id
            links {
                id
                description
                url
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
                createdAt
            }
            count
        }
    }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
    subscription {
        newLink {
            id
            description
            url
            postedBy {
                id
                name
            }
            votes {
                id
                user {
                    id
                }
            }
            createdAt
        }
    }
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
        createdAt
      }
      user {
        id
      }
    }
  }
`;

const getQueryVariables = (isNewPage, page) => {
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = {createdAt : 'desc'};
    return {take, skip, orderBy};
};

const LinkList = () => {

    const history = useHistory();

    const isNewPage = history.location.pathname.includes('new');

    const pageIndexParams = history.location.pathname.split('/');

    const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);

    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;
    
    const {
        data,
        loading,
        error,
        subscribeToMore
    } = useQuery(FEED_QUERY, {
        variables: getQueryVariables(isNewPage, page)
    });

    subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, {subscriptionData}) => {
            if(!subscriptionData.data) return prev;
            const newLink = subscriptionData.data.newLink;
            const exists = prev.feed.links.find(
                ({id}) => id === newLink.id
            );

            if(exists) return prev;
            
            return Object.assign({}, prev, {
                feed: {
                    links: [newLink, ...prev.feed.links],
                    count: prev.feed.links.length + 1,
                    __typename: prev.feed.__typename
                }
            });
        }
    });

    subscribeToMore({
        document: NEW_VOTES_SUBSCRIPTION,
    });

    const getLinksToRender = (isNewPage, data) => {
        if(isNewPage) {
            return data.feed.links;
        }
        const rankedLinks = data.feed.links.slice();
        rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
        return rankedLinks;
    }
 
    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && (
                <>
                    {
                        getLinksToRender(isNewPage, data).map((link, index) => {
                            return <Link key={link.id} link={link} index={index + pageIndex} />
                        })
                    }
                            {isNewPage && (
          <div className="flex ml4 mv3 gray">
            <div
              className="pointer mr2"
              onClick={() => {
                if (page > 1) {
                  history.push(`/new/${page - 1}`);
                }
              }}
            >
              Previous
            </div>
            <div
              className="pointer"
              onClick={() => {
                if (
                  page <=
                  data.feed.count / LINKS_PER_PAGE
                ) {
                  const nextPage = page + 1;
                  history.push(`/new/${nextPage}`);
                }
              }}
            >
              Next
            </div>
          </div>
        )}
                </>
            )}
        </>
    );
}

export default LinkList;