import { AnswerResponse as Answer, Quadratic } from '../../types/answer'
import { SurveyDashboard } from '../../types/survey'

export const survey: SurveyDashboard = {
  quadratic: [
    {
      id: 'Q1',
      statement: '11111',
    },
    {
      id: 'Q2',
      statement: '2222',
    },
    {
      statement: '3333',
      id: 'Q3',
    },
    {
      id: 'Q4',
      statement: '4444',
    },
    {
      statement: '5555',
      id: 'Q5',
    },
  ],
  analytics: {
    pilot: {
      previous: {
        respondents: 104,
        access: 354,
      },
      current: {
        respondents: 121,
        access: 406,
      },
      history: {
        access: 342,
        respondents: 97,
      },
    },
    published: {
      previous: {
        respondents: 1040,
        access: 3540,
      },
      current: {
        respondents: 1210,
        access: 4060,
      },
      history: {
        access: 3420,
        respondents: 970,
      },
    },
  },
  status: 'published',
  uid: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
  setup: {
    credits: 1,
    topic: 'Test',
    method: 'Quadratic',
  },
  language: {
    thumbsDown: 'Disagree',
    jargon: 'Agree/Disagree',
    token: 'Credits',
    thumbsUp: 'Agree',
  },
  id: 'FXvKAFKaYnFKZzKkWg0c',
  createdAt: '2022-07-07T22:33:43.425Z',
}

export const answers: Answer<Quadratic>[] = [
  {
    questions: [
      {
        id: 'Q1',
        vote: 0,
        credits: 0,
        order: 3,
      },
      {
        id: 'Q2',
        vote: 0,
        credits: 0,
        order: 1,
      },
      {
        credits: 1,
        id: 'Q3',
        vote: 1,
        order: 0,
      },
      {
        vote: 0,
        id: 'Q4',
        credits: 0,
        order: 2,
      },
      {
        id: 'Q5',
        credits: 0,
        vote: 0,
        order: 4,
      },
    ],
    param2: 'asdasd',
    researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
    status: 'published',
    time: {
      questionPageLoadAt: '2022-01-18T13:09:00.393Z',
      surveyLoadAt: '2022-01-18T13:09:00.393Z',
      startAt: '2022-01-18T13:09:00.105Z',
      submitedAt: '2022-01-18T13:09:06.153Z',
    },
    params1: 'asdasd',
    createdAt: '2022-01-18T13:09:06.181Z',
    leftCredits: 0,
    surveyId: 'FXvKAFKaYnFKZzKkWg0c',
  },
  {
    questions: [
      {
        vote: 0,
        id: 'Q1',
        credits: 0,
        order: 0,
      },
      {
        vote: -1,
        credits: 1,
        id: 'Q2',
        order: 1,
      },
      {
        vote: 0,
        id: 'Q3',
        credits: 0,
        order: 2,
      },
      {
        vote: 0,
        id: 'Q4',
        credits: 0,
        order: 3,
      },
      {
        id: 'Q5',
        vote: 0,
        credits: 0,
        order: 4,
      },
    ],
    createdAt: '2022-01-18T13:09:22.717Z',
    params1: 'asdasd',
    status: 'published',
    param2: 'asdasd',
    surveyId: 'FXvKAFKaYnFKZzKkWg0c',
    time: {
      startAt: '2022-01-18T13:09:00.105Z',
      submitedAt: '2022-01-18T13:09:22.684Z',
      surveyLoadAt: '2022-01-18T13:09:16.452Z',
      questionPageLoadAt: '2022-01-18T13:09:00.393Z',
    },
    leftCredits: 0,
    researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
  },
  {
    researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
    param2: 'asdasd',
    surveyId: 'FXvKAFKaYnFKZzKkWg0c',
    questions: [
      {
        vote: 0,
        id: 'Q1',
        credits: 0,
        order: 0,
      },
      {
        id: 'Q2',
        credits: 0,
        vote: 0,
        order: 1,
      },
      {
        credits: 0,
        vote: 0,
        id: 'Q3',
        order: 2,
      },
      {
        id: 'Q4',
        credits: 0,
        vote: 0,
        order: 3,
      },
      {
        id: 'Q5',
        credits: 1,
        vote: 1,
        order: 4,
      },
    ],
    createdAt: '2022-01-18T13:09:10.070Z',
    status: 'published',
    time: {
      startAt: '2022-01-18T13:09:00.105Z',
      questionPageLoadAt: '2022-01-18T13:09:00.393Z',
      surveyLoadAt: '2022-01-18T13:09:06.481Z',
      submitedAt: '2022-01-18T13:09:10.057Z',
    },
    leftCredits: 0,
    params1: 'asdasd',
  },
  {
    surveyId: 'FXvKAFKaYnFKZzKkWg0c',
    createdAt: '2022-01-18T13:09:43.039Z',
    time: {
      questionPageLoadAt: '2022-01-18T13:09:00.393Z',
      surveyLoadAt: '2022-01-18T13:09:23.045Z',
      submitedAt: '2022-01-18T13:09:43.000Z',
      startAt: '2022-01-18T13:09:00.105Z',
    },
    leftCredits: 0,
    param2: 'asdasd',
    questions: [
      {
        id: 'Q1',
        credits: 0,
        vote: 0,
        order: 0,
      },
      {
        credits: 1,
        id: 'Q2',
        vote: 1,
        order: 1,
      },
      {
        credits: 0,
        vote: 0,
        id: 'Q3',
        order: 2,
      },
      {
        vote: 0,
        id: 'Q4',
        credits: 0,
        order: 3,
      },
      {
        credits: 0,
        id: 'Q5',
        vote: 0,
        order: 4,
      },
    ],
    params1: 'asdasd',
    researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
    status: 'published',
  },
  {
    researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
    createdAt: '2022-01-18T13:09:16.165Z',
    param2: 'asdasd',
    time: {
      startAt: '2022-01-18T13:09:00.105Z',
      submitedAt: '2022-01-18T13:09:16.129Z',
      questionPageLoadAt: '2022-01-18T13:09:00.393Z',
      surveyLoadAt: '2022-01-18T13:09:10.380Z',
    },
    leftCredits: 0,
    questions: [
      {
        vote: 0,
        id: 'Q1',
        credits: 0,
        order: 1,
      },
      {
        credits: 1,
        id: 'Q2',
        vote: -1,
        order: 2,
      },
      {
        credits: 0,
        vote: 0,
        id: 'Q3',
        order: 3,
      },
      {
        vote: 0,
        id: 'Q4',
        credits: 0,
        order: 4,
      },
      {
        credits: 0,
        id: 'Q5',
        vote: 0,
        order: 0,
      },
    ],
    surveyId: 'FXvKAFKaYnFKZzKkWg0c',
    params1: 'asdasd',
    status: 'published',
  },
  {
    param2: 'asdasd',
    params1: 'asdasd',
    createdAt: '2022-01-18T12:51:05.503Z',
    questions: [
      {
        vote: 1,
        id: 'Q1',
        credits: 1,
        order: 0,
      },
      {
        id: 'Q2',
        credits: 0,
        vote: 0,
        order: 1,
      },
      {
        id: 'Q3',
        vote: 0,
        credits: 0,
        order: 2,
      },
      {
        vote: 0,
        credits: 0,
        id: 'Q4',
        order: 3,
      },
      {
        vote: 0,
        id: 'Q5',
        credits: 0,
        order: 4,
      },
    ],
    time: {
      surveyLoadAt: '2022-01-18T12:50:58.649Z',
      questionPageLoadAt: '2022-01-18T13:09:00.393Z',
      submitedAt: '2022-01-18T12:51:05.473Z',
      startAt: '2022-01-18T12:50:58.334Z',
    },
    leftCredits: 0,
    status: 'pilot',
    surveyId: 'FXvKAFKaYnFKZzKkWg0c',
    researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
  },
  {
    researcherId: '5rePA4xTN9V8aV5dAJ5aTaHoIFA3',
    userId: '1234',
    questions: [
      {
        vote: 1,
        credits: 1,
        id: 'Q1',
        order: 2,
      },
      {
        credits: 0,
        vote: 0,
        id: 'Q2',
        order: 3,
      },
      {
        vote: 0,
        id: 'Q3',
        credits: 0,
        order: 1,
      },
      {
        credits: 0,
        vote: 0,
        id: 'Q4',
        order: 0,
      },
      {
        credits: 0,
        id: 'Q5',
        vote: 0,
        order: 4,
      },
    ],
    surveyId: 'FXvKAFKaYnFKZzKkWg0c',
    time: {
      startAt: '2022-01-19T06:16:50.612Z',
      submitedAt: '2022-01-19T06:16:55.887Z',
      surveyLoadAt: '2022-01-19T06:16:50.987Z',
      questionPageLoadAt: '2022-01-18T13:09:00.393Z',
    },
    createdAt: '2022-01-19T06:16:55.943Z',
    status: 'published',
    leftCredits: 0,
  },
]
