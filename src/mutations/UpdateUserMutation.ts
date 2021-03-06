import * as Relay from 'react-relay'

interface Props {
  userId: string
  gettingStartedStatus?: string
  name?: string
  email?: string
}

export default class UpdateUserMutation extends Relay.Mutation<Props, {}> {

  getMutation () {
    return Relay.QL`mutation{updateUser}`
  }

  getFatQuery () {
    return Relay.QL`
      fragment on UpdateUserPayload {
        user
      }
    `
  }

  getConfigs () {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.userId,
      },
    }]
  }

  getVariables () {
    return {
      gettingStartedStatus: this.props.gettingStartedStatus,
      name: this.props.name,
      email: this.props.email,
    }
  }

  getOptimisticResponse () {
    return {
      user: {
        id: this.props.userId,
        gettingStartedStatus: this.props.gettingStartedStatus,
        name: this.props.name,
        email: this.props.email,
      },
    }
  }
}
