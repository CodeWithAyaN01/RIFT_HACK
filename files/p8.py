# program 8 offline
# Program 8
# Decision Tree Classification on Breast Cancer Dataset

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn import tree

# Load dataset
data = pd.read_csv("breast_cancer.csv")
X = data.drop(columns=['target']).values
y = data['target'].values

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create and train model
clf = DecisionTreeClassifier(random_state=42)
clf.fit(X_train, y_train)

# Predictions
y_pred = clf.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy * 100:.2f}%')

# Plot decision tree
plt.figure(figsize=(12, 8))

tree.plot_tree(
    clf,
    filled=True,
    feature_names=data.drop(columns=['target']).columns.tolist(),
    class_names=['Malignant', 'Benign']
)

plt.title('Decision Tree - Breast Cancer Dataset')

plt.show()