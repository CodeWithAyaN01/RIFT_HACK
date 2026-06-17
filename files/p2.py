# program 2
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing

data = pd.read_csv("california_housing.csv")

# california_data = fetch_california_housing(as_frame=True)
# data = california_data.frame

correlation_matrix = data.corr()

plt.figure(figsize=(10,10))

sns.heatmap(correlation_matrix, annot = True, cmap="coolwarm", linewidth = 0.5)

plt.title("Something")
plt.show()

sns.pairplot(data)
plt.suptitle('pair plot of california Housing Feature', y = 1.02)
plt.show()