export class NodeListHelpers {

  static findNodeByText(listOfNodes, targetText) {
    let i, actualText, listOfNodesLength = listOfNodes.length;

    for (i = 0; i <	listOfNodesLength; i++) {
      actualText = listOfNodes[i].textContent;
      if (actualText.indexOf(targetText) > -1) {
        return listOfNodes[i];
      }
    }
  }

}
