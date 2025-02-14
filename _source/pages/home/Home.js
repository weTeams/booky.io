/* eslint-disable max-lines */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';

import Page from '../../templates/page';
import Categories from '../../organisms/categories';
import Search from '../../organisms/search';
import { DashboardsSidebar } from '../../organisms/dashboards';
import { H2, H3, Display } from '../../atoms/headline';
import Link from '../../atoms/link';
import P from '../../atoms/paragraph';
import {
  ButtonLargeBlue,
  ButtonLargeLight,
  ButtonSmallPrimary,
  ButtonSmallLight,
  ButtonSmallMedium
} from '../../atoms/button';
import Illustration from '../../atoms/illustration';
import Section from '../../molecules/section';
import Testimonials from '../../molecules/testimonials';
import Feature from '../../molecules/feature';
import Features from '../../molecules/features';

const surveyMap = {
  de: {
    link: 'https://survey.typeform.com/to/baRC3Yb3',
    copy: 'Hast du kurz Zeit, uns zu helfen, booky.io zu verbessern?',
    yesCopy: 'Zur Umfrage'
  },
  en: {
    link: 'https://survey.typeform.com/to/tyAz7rMT',
    copy: 'Do you have a moment to help us improve booky.io?',
    yesCopy: 'To the survey'
  }
};

class Home extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    blurContent: PropTypes.bool.isRequired,
    hasSidebar: PropTypes.bool.isRequired,
    getDashboards: PropTypes.func.isRequired,
    updateSearchData: PropTypes.func.isRequired,
    searchBookmarks: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    categoriesPending: PropTypes.bool,
    hasCategories: PropTypes.bool,
    dashboardsOpen: PropTypes.bool,
    keywordExists: PropTypes.bool,
    language: PropTypes.string,
    darkMode: PropTypes.bool
  };

  state = {
    // showSurveyBanner: !localStorage.getItem('hideSurveyBanner')
    showSurveyBanner: false
  };

  componentDidMount() {
    const {
      loggedIn,
      getDashboards,
      updateSearchData,
      searchBookmarks
    } = this.props;
    const params = new URLSearchParams(window.location.search);
    const term = params.get('term');

    if (term) {
      updateSearchData({
        keyword: term,
        pending: true
      });

      searchBookmarks({
        keyword: term,
        abort: false
      });
    }

    loggedIn && getDashboards(Boolean(term));
  }

  hideSurveyBanner = () => {
    localStorage.setItem('hideSurveyBanner', true);

    this.setState({
      showSurveyBanner: false
    });
  };

  render() {
    const {
      loggedIn,
      blurContent,
      hasSidebar,
      intl,
      keywordExists,
      language,
      darkMode,
      dashboardsOpen
    } = this.props;
    const { showSurveyBanner } = this.state;
    const DeclineButton = darkMode ? ButtonSmallLight : ButtonSmallMedium;

    return loggedIn ? (
      <Page toolbar={loggedIn} dashboards home>
        {hasSidebar && (
          <DashboardsSidebar
            className={classNames(blurContent && 'page--blur')}
          />
        )}
        {keywordExists ? (
          <Search />
        ) : (
          <>
            {showSurveyBanner && (
              <div
                role="banner"
                className={classNames(
                  'survey',
                  darkMode && 'survey--dark-mode',
                  hasSidebar && 'survey--sidebar',
                  hasSidebar && dashboardsOpen && 'survey--shifted'
                )}
              >
                <P noPadding className="survey__text">
                  {surveyMap[language].copy}
                </P>
                <span className="survey__buttons">
                  <ButtonSmallPrimary
                    solid
                    href={surveyMap[language].link}
                    target="_blank"
                    className="survey__confirm"
                    onClick={this.hideSurveyBanner}
                  >
                    {surveyMap[language].yesCopy}
                  </ButtonSmallPrimary>
                  <DeclineButton onClick={this.hideSurveyBanner}>
                    <FormattedMessage id="button.no" />
                  </DeclineButton>
                </span>
              </div>
            )}
            <Categories className={classNames(blurContent && 'page--blur')} />
          </>
        )}
      </Page>
    ) : (
      <Page home className="home">
        <section className="home__header">
          <div className="home__header-wrapper">
            <Display noMargin centered>
              <FormattedMessage id="home.display" />
            </Display>
            <H2 noMargin centered>
              <FormattedMessage id="home.display2" />
            </H2>
            <ButtonLargeBlue icon="join" to="/join" className="home__join">
              <FormattedMessage
                id="header.register"
                values={{ b: (msg) => <b>{msg}</b> }}
              />
            </ButtonLargeBlue>
            <ButtonLargeLight icon="about" to="/about">
              <FormattedMessage
                id="header.learnMore"
                values={{ b: (msg) => <b>{msg}</b> }}
              />
            </ButtonLargeLight>
          </div>
          <Illustration name="devices" className="home__header-illustration" />
        </section>
        <Section color="light" noPadding contentClassName="home__testimonials">
          <Testimonials />
        </Section>
        <Section>
          <Feature
            headline={intl.formatMessage({ id: 'home.privateHeadline' })}
            text={intl.formatMessage({ id: 'home.privateText' })}
            illustration="protection"
          />
        </Section>
        <Section>
          <Feature
            headline={intl.formatMessage({ id: 'home.customizableHeadline' })}
            text={intl.formatMessage({ id: 'home.customizableText' })}
            illustration="customize"
            direction="right"
          />
        </Section>
        <Section color="dark" contentClassName="home__bookmarklet">
          <Illustration
            className="home__plant booky--hide-mobile"
            name="plant"
          />
          <Illustration
            className="home__trees booky--hide-mobile-tablet"
            name="trees"
          />
          <H2 style="h1" color="light" noMargin centered>
            <FormattedMessage id="misc.feature1" />
          </H2>
          <H3 style="h2" color="light" noMargin centered>
            <FormattedMessage id="home.extensionText" />
          </H3>
          <nav className="home__extension">
            <Link
              href="https://chrome.google.com/webstore/detail/bookyio-extension/pmcpkkipiedakcaolhnbijibndfemckf"
              target="_blank"
              color="light"
              className="home__extension-browser"
            >
              <img
                width="75"
                height="75"
                alt=""
                className="home__extension-icon"
                src="../../_assets/logos/chrome.svg"
                loading="lazy"
              />
              {'Chrome'}
            </Link>
            <Link
              href="https://addons.mozilla.org/en-US/firefox/addon/booky-io-extension/"
              target="_blank"
              color="light"
              className="home__extension-browser"
            >
              <img
                width="75"
                height="75"
                alt=""
                className="home__extension-icon"
                src="../../_assets/logos/firefox.svg"
                loading="lazy"
              />
              {'Firefox'}
            </Link>
            <Link
              href="https://addons.opera.com/de/extensions/details/bookyio-extension/"
              target="_blank"
              color="light"
              className="home__extension-browser"
            >
              <img
                width="75"
                height="75"
                alt=""
                className="home__extension-icon"
                src="../../_assets/logos/opera.svg"
                loading="lazy"
              />
              {'Opera'}
            </Link>
            <Link
              href="https://microsoftedge.microsoft.com/addons/detail/bookyio-erweiterung/gnhlkmoepijbfnmblekhhdgkgdahdjek"
              target="_blank"
              color="light"
              className="home__extension-browser"
            >
              <img
                width="75"
                height="75"
                alt=""
                className="home__extension-icon"
                src="../../_assets/logos/edge.svg"
                loading="lazy"
              />
              {'Edge'}
            </Link>
          </nav>
        </Section>
        <Section>
          <Feature
            headline={intl.formatMessage({ id: 'home.performantHeadline' })}
            text={intl.formatMessage({ id: 'home.performantText' })}
            illustration="speed"
          />
        </Section>
        <Section>
          <Feature
            headline={intl.formatMessage({ id: 'home.mobileHeadline' })}
            text={intl.formatMessage({ id: 'home.mobileText' })}
            illustration="mobile"
            direction="right"
          />
        </Section>
        <Section color="light" contentClassName="home__features">
          <H2 style="h1" noMargin centered className="home__features-headline">
            <FormattedMessage id="misc.features" />
          </H2>
          <Features />
        </Section>
        <Section className="home__not-a-member">
          <Illustration className="home__heart" name="heart" />
          <H2 style="h1" centered noMargin>
            <FormattedMessage id="home.notAMember" />
          </H2>
          <H3 style="h2" noMargin centered>
            <FormattedMessage id="home.promoText" />
          </H3>
          <ButtonLargeBlue
            icon="join"
            to="/join"
            contentBefore
            className="home__join"
          >
            <FormattedMessage
              id="header.register"
              values={{ b: (msg) => <b>{msg}</b> }}
            />
          </ButtonLargeBlue>
          <ButtonLargeLight icon="about" to="/about">
            <FormattedMessage
              id="header.learnMore"
              values={{ b: (msg) => <b>{msg}</b> }}
            />
          </ButtonLargeLight>
        </Section>
      </Page>
    );
  }
}

export default injectIntl(Home);
