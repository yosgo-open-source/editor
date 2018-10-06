const valueConfig = (placeHolder?: string) => {
  return {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: `${placeHolder ? placeHolder : '寫點什麼...'}`
                }
              ]
            }
          ]
        }
      ]
    }
  };
};

export default valueConfig;
