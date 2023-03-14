# Two Connect Technical Assessment

Create a ReactJS application using at least the following tools 
Webpack (you can use Create React App)
Typescript
Jest
NodeJS/NPM

The application must have the following
Class Component
Functional components using React Hooks.
Tests using Jest
Higher Order component
React Context

You a free to use any Library of your choice and if necessary, you can add extra functionally to complete the above requirements.  

There  should be a Jest Test for the ConditionalSelectBox component

The Application Requirements
We want to build a basic form designer where you can define the number of groups and how many fields/field types within the group.   Based of this design we want to build a form for a user to complete and save the answers to localStorage.  The application needs to have the following components

InputBox Component

A HTML input text box with a label

SelectBox Component

A HTML Select box with a label and at least 2 options


ConditionalSelectBox component

A HTML Select box with a label with the following options
None
Show InputBox
Show SelectBox
When a user selects “Show InputBox” Display an InputBox below the ConditionalSelectBox.
When a user selects “Show SelectBox” Display a SelectBox below the ConditionalSelectBox.
When a user selects “None” Don’t display anything below the ConditionalSelectBox.


Template Component
This component will have the following fields
InputBox: for the number of times to repeat the following fields
InputBox: Number of InputBox components to display
InputBox: Number SelectBox components to display
InputBox: Number of ConditionalSelectBox to display
Button: Saves the values on the page using a JSON object and storing in localStorage.

Form Component
A component that loads the saved template component JSON object from localStorage and displays the fields defined in the JSON

The component should also have a save button which saves the entered values into a JSON object and stored in localStorage

Example: If the Template JSON has the following 
for the number of times to repeat the following fields:2
Number of InputBox components to display: 3
Number SelectBox components to display: 2
Number of ConditionalSelectBox to display: 1

I expect to see 12 components on the page.
Eg.
InputBox
InputBox
InputBox
SelectBox
SelectBox
ConditionalSelectBox

InputBox
InputBox
InputBox
SelectBox
SelectBox
ConditionalSelectBox
