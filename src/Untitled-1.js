chcbox.change(e => {
  if(e.target.checked) {
    React.render(<A checked={true} />, el);
  } else {
    React.render(<A checked={false} />, el);
  }
})
