import numpy as np
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier

np.random.seed(42)

x_values = np.random.rand(100).reshape(-1, 1)

y_labels = np.array([
    1 if x <= 0.5 else 2
    for x in x_values[:50]
])

X_train = x_values[:50]
y_train = y_labels

X_test = x_values[50:]

k_values = [1, 2, 3, 4, 5, 20, 30]

predictions = {}

for k in k_values:

    knn = KNeighborsClassifier(n_neighbors=k)

    knn.fit(X_train, y_train)

    y_pred = knn.predict(X_test)

    predictions[k] = y_pred

plt.figure(figsize=(10, 6))

plt.scatter(
    X_train,
    np.zeros_like(X_train),
    c=['red' if y == 1 else 'blue' for y in y_train],
    label="Train Data (Labeled)",
    marker='o'
)

for i, k in enumerate(k_values):

    plt.scatter(
        X_test,
        [i + 1] * len(X_test),
        c=['red' if y == 1 else 'blue' for y in predictions[k]],
        marker='x',
        label=f"k={k}"
    )

plt.axvline(
    x=0.5,
    color="black",
    linestyle="--",
    label="Decision Boundary (x=0.5)"
)

plt.xlabel("x values")
plt.ylabel("Different k values (scaled)")

plt.title("KNN Classification for Different k Values")

plt.legend()
plt.show()