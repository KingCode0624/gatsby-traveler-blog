import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ArticlePreview from '../components/articlePreview'
import { rhythm } from '../utils/typography'
import styled from 'styled-components'

const Section = styled.section`
  display: grid;
  grid-template-columns: minmax(250px, 1fr);
  grid-gap: 30px;
  margin: 0 30px;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const siteCoverImageUrl = data.site.siteMetadata.siteCoverImageUrl

    return (
      <Layout
        location={this.props.location}
        coverImageUrl={siteCoverImageUrl}
        title={siteTitle}
      >
        <SEO
          title="All posts"
          keywords={['blog', 'gatsby', 'javascript', 'react']}
        />
        {/* <Bio /> */}
        <Section>
          {posts.map(({ node }) => {
            return (
              <>
                <ArticlePreview key={node.fields.slug} node={node} />
              </>
            )
          })}
        </Section>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteCoverImageUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            coverImage {
              childImageSharp {
                fluid(maxWidth: 960, maxHeight: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
