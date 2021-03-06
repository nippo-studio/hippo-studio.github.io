'use strict';

import * as React from 'react';

import {DailyReport} from '../../constants/DailyReport';

import {today} from '../../misc/Date';

import {IndexView} from '../views/IndexView';

export class IndexController extends React.Component<any, any> {
  render() {
    return (
      <IndexView onDailyReportSubmit={this.handleDailyReportSubmit} />
    );
  }

  private handleDailyReportSubmit = (report: DailyReport) => {
    const {to, cc, subject, body} = buildMailComponents(report);
    const href = `mailto:${to}?cc=${cc}&subject=${subject}&body=${body}`;
    location.href = href;
  };
}

function buildMailComponents(report: DailyReport) {
  const to = 'hr-development@mixi.co.jp';
  const cc = '16shinsotsu-all@mixi.co.jp';
  const subject = `【日報】${today()} 16新卒　${report.name}`;
  const requiredBody = buildRequiredBody(report);
  const optionalBody = buildOptionalBody(report);
  return {
    to,
    cc,
    subject: encodeURIComponent(subject),
    body: encodeURIComponent(requiredBody + optionalBody),
  };
}

function buildRequiredBody(report: DailyReport): string {
  return `1、本日の業務
${report.firstContent}

2、明日の業務
${report.secondContent}

3、本日の業務で気づいたこと・学んだこと
${report.thirdContent}`;
}

function buildOptionalBody(report: DailyReport): string {
  return report.fourthContent == null ? '' :
`

4、その他
${report.fourthContent}`;
}
