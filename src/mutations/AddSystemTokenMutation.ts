import * as Relay from 'react-relay'

interface Props {
  projectId: string
  tokenName: string
}

export default class AddSystemTokenMutation extends Relay.Mutation<Props, {}> {

  getMutation () {
    return Relay.QL`mutation{createSystemToken}`
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateSystemTokenPayload {
        systemTokenEdge
        project
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'project',
      parentID: this.props.projectId,
      connectionName: 'systemTokens',
      edgeName: 'systemTokenEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }

  getVariables() {
    return {
      projectId: this.props.projectId,
      name: this.props.tokenName,
    }
  }
}